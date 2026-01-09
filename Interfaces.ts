// ====== Interfaces ======
interface User { ... }
interface Todo { ... }
interface Project { ... }
interface ApiResponse { ... }


// ====== Function Signatures ======
function getTodosByUser(userId: number): Todo[];
function updateTodoStatus(todoId: number, completed: boolean): Todo;
function deleteProject(projectId: number): boolean;


// ====== Example API Responses ======

const failedUserResponse: ApiResponse = {
  status: 404,
  success: false,
  error: "User not found",
};

const todos: Todo[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    completed: false,
    userId: 1,
    createdAt: new Date(),
  },
];

const successfulTodosResponse: ApiResponse = {
  status: 200,
  success: true,
  data: todos,
};

const serverErrorResponse: ApiResponse = {
  status: 500,
  success: false,
  error: "Internal server error",
};
