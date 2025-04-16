import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const URL = 'http://localhost:4000/api';
const URL = import.meta.env.VITE_URL;

const getToken = () => localStorage.getItem("token");

const initialState = {
	tasks: [],
	filter: "All",
	status: "idle", //'idle' | 'loading' | 'success' | 'failed'
	error: null,
};

export const getOwnerTasks = createAsyncThunk(
	"task/getOwnerTasks",
	async (ownerid) => {
		const { data } = await axios.get(
			`${URL}/api/v1/tasks/owner/${ownerid}`,
			{ headers: { Authorization: getToken() } }
		);
		return data;
	}
);

export const getTasks = createAsyncThunk("task/getTasks", async () => {
	const { data } = await axios.get(`${URL}/api/v1/tasks`, {
		headers: { Authorization: getToken() },
	});
	return data;
});

export const postTask = createAsyncThunk("task/postTask", async (payload) => {
	console.log("payload: ", payload);
	const { data } = await axios.post(`${URL}/api/v1/tasks/create`, payload, {
		headers: { Authorization: getToken() },
	});
	return data;
});

export const putTask = createAsyncThunk("task/putTask", async (payload) => {
	const { data } = await axios.put(
		`${URL}/api/v1/tasks/update/${payload._id}`,
		payload,
		{ headers: { Authorization: getToken() } }
	);
	return data;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
	const { data } = await axios.delete(`${URL}/api/v1/tasks/delete/${id}`, {
		headers: { Authorization: getToken() },
	});
	return data;
});

export const deleteManyTask = createAsyncThunk(
	"task/deleteMenyTask",
	async (payload) => {
		console.log("id list payload: ", payload);
		const { data } = await axios.post(
			`${URL}/api/v1/tasks/delete-many`,
			payload,
			{ headers: { Authorization: getToken() } }
		);
		return data;
	}
);

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		ChangeFilter: (state, action) => {
			state.filter = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.status = "success";
				state.tasks = [...action.payload];
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})

			.addCase(getOwnerTasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getOwnerTasks.fulfilled, (state, action) => {
				state.status = "success";
				state.tasks = [...action.payload];
			})
			.addCase(getOwnerTasks.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})

			.addCase(deleteManyTask.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteManyTask.fulfilled, (state, action) => {
				const { deletedCount, ids } = action.payload;
				state.status = "success";
				if (deletedCount > 0) {
					state.tasks = state.tasks.filter(
						(value) => ids.indexOf(value._id) == -1
					);
				}
			})
			.addCase(deleteManyTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})

			.addCase(postTask.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(postTask.fulfilled, (state, action) => {
				state.status = "success";
				state.tasks.push(action.payload);
				state.error = "";
			})
			.addCase(postTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(putTask.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(putTask.fulfilled, (state, action) => {
				state.status = "success";
				state.tasks = state.tasks.map((todo) =>
					todo._id === action.payload._id ? action.payload : todo
				);
				state.error = "";
			})
			.addCase(putTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteTask.pending, (state) => {
				state.status = "loading";
				state.error = "";
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.status = "success";
				state.tasks = state.tasks.filter(
					(todo) => todo._id !== action.payload._id
				);
				state.error = "";
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const selectAllTasks = (state) => state.taskReducer.tasks;
export const getTaskStatus = (state) => state.taskReducer.status;
export const getTaskError = (state) => state.taskReducer.error;
export const getFilter = (state) => state.taskReducer.filter;
export const getCompleted = (state) =>
	state.taskReducer.tasks.filter((task) => task.completed === true);

export const { ChangeFilter } = taskSlice.actions;
export default taskSlice.reducer;
