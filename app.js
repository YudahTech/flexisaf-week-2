document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let todos = [];

  // Function to render tasks based on the selected filter
  const renderTodos = (filter = "all") => {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    filteredTodos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;
      li.innerHTML = `
        <span>${todo.text}</span>
        <div>
          <button class="complete-btn">${
            todo.completed ? "Undo" : "Done"
          }</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      // Mark as completed
      li.querySelector(".complete-btn").addEventListener("click", () => {
        todos[index].completed = !todos[index].completed;
        renderTodos(filter);
      });

      // Delete task
      li.querySelector(".delete-btn").addEventListener("click", () => {
        todos.splice(index, 1);
        renderTodos(filter);
      });

      todoList.appendChild(li);
    });
  };

  // Add button functionality to add new tasks
  const addTask = () => {
    const text = input.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      input.value = "";
      renderTodos();
    }
  };

  // Attach event listener to Add button
  addBtn.addEventListener("click", addTask);

  // Handle Enter key for adding tasks
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Event listeners for filtering tasks
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderTodos(button.dataset.filter);
    });
  });

  // Initial rendering
  renderTodos();
});

// 1. SCOPE:
// Scope refers to the accessibility of variables.
// In ES6, `let` and `const` are block-scoped : meaning if the variable is declared inside a function, it can't be accessed outside that function.
function testScope() {
  let blockScoped = "I am block-scoped";
  const alsoBlockScoped = "I am also block-scoped";
}
console.log(blockScoped); // ReferenceError: blockScoped is not defined
console.log(alsoBlockScoped); // ReferenceError: alsoBlockScoped is not defined

// 2. LET KEYWORD:
// `let` allows you to declare variables that are block-scoped: meaning if the variable is declared inside a function like the above  example, it can't be accessed outside that function.  and
// mutable: meaning the value can be changed .
let count = 5;
count = 12;
if (true) {
  let count = 10; // This `count` is different from the outer `count`
  console.log(count); // Outputs: 10
}
console.log(count); // Outputs: 12

// 3. CONST KEYWORD:
// `const` is used to declare block-scoped variables that are read-only (immutable reference: meaning it can't be changed).
const PI = 3.14;
PI = 3.15; // Error: Assignment to constant variable
console.log(PI);
const person = { name: "John", age: 30 };
// You can modify properties of an object declared with `const`
person.age = 31; // Valid
console.log(person); // Outputs: { name: "John", age: 31 }

// 4. ARROW FUNCTIONS:
// Arrow functions provide a shorter syntax for writing functions and do not have their own `this`.
const add = (x, y) => {
  return x + y;
};
console.log(add(2, 3)); // outputs 5
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Habib")); // Outputs: "Hello, Habib!"
// You can ignore the parentheses if there's only one parameter and omit the curly braces and return keyword, if the function has only one statement.

// 5. ARRAY METHODS:
// (a) MAP:
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // Outputs: [2, 4, 6]

// (b) FILTER:
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Outputs: [2]

// (c) REDUCE:
const sum = numbers.reduce((acc, num) => acc + num, 0); // Initial accumulator value is 0
console.log(sum); // Outputs: 6

// (d) FOREACH:
numbers.forEach((num) => console.log(num * 2)); // Outputs: 2, 4, 6

// 6. OBJECTS:

const name = "Habib";
const age = 25;

// (a) Shorthand property names
const user = { name, age }; // Equivalent to { name: name, age: age }
console.log(user); // Outputs: { name: "Habib", age: 25 }

// (b) Destructuring
const { name: userName, age: userAge } = user;
console.log(userName); // Outputs: "Habib"
console.log(userAge); // Outputs: 25

// (c) Spread operator
const address = { city: "New York", country: "USA" };
const userDetails = { ...user, ...address }; // Merges user and address objects
console.log(userDetails);
// Outputs: { name: "Habib", age: 25, city: "New York", country: "USA" }

// (d) Rest operator
const figures = (x, y, ...rest) => {
  console.log("x:", x); // First argument
  console.log("y:", y); // Second argument
  console.log("rest:", rest); // Remaining arguments as an array

  return rest; // Return the rest array
};

console.log(figures(1, 2, 3, 4, 5)); // Outputs: [3, 4, 5]
