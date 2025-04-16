const {UserRepo} = require('../db/repository');
const sendEmail = require('../utilitaire/email/sendEmail');
const {TmpUser} = require('../db/model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (userData) =>{
    const {email} = userData 

    const existingUser = await UserRepo.findOneUser({email});

    if(existingUser){
        return { status: 422, message: 'User already exists and is active', data:null };
    }

    const existingTmpUser = await TmpUser.findOne({email});

    if (existingTmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {


        const tmpUser = new TmpUser(userData)
        const user = await tmpUser.save()
        // const user = await (new TmpUser(userData)).save()

      const link = `${process.env.CLIENT_URL}/#${process.env.ACTIVATION_PATH}?token=${user.token}&id=${user._id}`;
      console.log('link: ', link)
      const payload = {name: user.name, link}
      console.log('payload: ', payload)
      await sendEmail(user.email, "vérification et activation de compte", payload, "./template/emailVerification.handlebars")
      return { status: 200, message: `création de compte entamée avec succes. Un email a été envoyé sur ${user.email}, pour verification et activation. `, data: null}
    
    } catch (error) {
      return {status: 422, message: "error.message",  data:  null }
    }

}


const Activate = async (payload) => {

  const { token, userId } = payload;
  console.log('userId: ', userId)
  const user = await TmpUser.findById(userId);

  if (!user) {
      return { status: 200, isOk: false, message: "Désolé votre token d'activation a expiré, vous pouvez reprendre le processus de creation de compte. merci.", data: null  }
  }

  if (user.token !== token) {
      return { status: 200, isOk: false, message: "Désolé votre token est invalide", data: null }
  }

  try {
      const {__v, _id, otp, createdAt, token, ...rest} = user.toJSON()

      const existingUser = await UserRepo.findOneUser({_id: rest._id});

      if (!existingUser) {
        console.log('rest: ', rest)
        const newUser = await UserRepo.createUser({...rest, is_active: true})

        return { status: 200, isOk: true, message: "Votre compte a été activé avec succès. vous pouvez vous connecter à présent",  data: newUser }
        
      } else {
        return { status: 200, isOk: false, message: "Le compte utilisateur est déjà existant et activé.",  data: existingUser }
      }
      
  } catch (error) {
      return { status: 401, isOk: false, message: error.message,  data: null }
  }

}  


const login = async ({email, password}) => {
  const SECRET = process.env.JWT_SECRET;
  const expiresIn = process.env.TOKEN_EXPIRES_IN;

  const connectingUser = await UserRepo.findOneUser({email})
  console.log('connectingUser: ', connectingUser)
  if(!connectingUser) {
      return {status:401 ,message: 'Email introuvable', data: null}
  }

  const isPasswordValid = await bcrypt.compare(password, connectingUser.password);
  console.log('isPasswordValid: ', isPasswordValid)
  if (!isPasswordValid) {
      return { status: 401, message: "Infos. d'identification incorrect, email ou password invalid ",  data:null }
  }

  try {
      // generate access token
      const accessToken = jwt.sign({userId: connectingUser._id}, SECRET, {expiresIn: '3600s'});
      // generate access token
      const refreshToken = jwt.sign({userId: connectingUser._id}, SECRET, {expiresIn: '7d'});
      // retourner le user sans certains champs avec les infos login (les tokens)
      const {password, __v, is_active, ...rest} = connectingUser.toJSON()

      return {status: 200,  message: 'vous êtes connectés', data: {user: rest, accessToken, refreshToken}  }
      
  } catch (error) {
      return { status:500, message: 'Server error', data: null }
  }
}




module.exports = {register, Activate, login}