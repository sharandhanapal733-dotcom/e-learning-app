export const coursesData = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Master the basics of React.js with hands-on lessons and build modern web applications",
    duration: "6 hours",
    level: "Beginner",
    category: "web",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    modules: [
      {
        id: 1,
        title: "Introduction to React",
        lessons: [
          {
            id: 1,
            title: "What is React?",
            content: "React is a JavaScript library for building user interfaces. It lets you create reusable components and build complex UIs from small, isolated pieces of code. React uses a virtual DOM for better performance and provides a declarative way to build UIs.",
            duration: "10 min",
            type: "text"
          },
          {
            id: 2,
            title: "JSX Syntax and Expressions",
            content: "JSX allows you to write HTML-like syntax in JavaScript. It makes your code more readable and expressive. JSX gets compiled to React.createElement() calls and makes component structure clearer. Learn about JSX expressions, embedding JavaScript, and JSX rules.",
            duration: "15 min",
            type: "text"
          },
          {
            id: 3,
            title: "Your First Component",
            content: "Components are the building blocks of React applications. Learn how to create your first functional component and understand component structure, props, and rendering. We'll build a simple button component together.",
            duration: "12 min",
            type: "text"
          },
          {
            id: 4,
            title: "Props and Data Flow",
            content: "Props allow you to pass data from parent to child components. They are read-only and help make your components reusable and dynamic. Learn prop drilling and best practices for data flow in React.",
            duration: "18 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "React Basics Quiz",
          questions: [
            {
              id: 1,
              question: "What is React primarily used for?",
              options: [
                "Backend development",
                "Building user interfaces",
                "Database management",
                "Mobile app development only"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What does JSX stand for?",
              options: [
                "JavaScript XML",
                "Java Syntax Extension",
                "JavaScript Extension",
                "XML JavaScript"
              ],
              correctAnswer: 0
            },
            {
              id: 3,
              question: "Which of these is a valid React component?",
              options: [
                "function MyComponent() { return <div>Hello</div>; }",
                "class MyComponent { render() { return <div>Hello</div>; } }",
                "const MyComponent = () => <div>Hello</div>;",
                "All of the above"
              ],
              correctAnswer: 3
            },
            {
              id: 4,
              question: "What are props in React?",
              options: [
                "Component methods",
                "Inputs to components (read-only)",
                "State variables",
                "Lifecycle methods"
              ],
              correctAnswer: 1
            },
            {
              id: 5,
              question: "JSX is:",
              options: [
                "A programming language",
                "A syntax extension for JavaScript",
                "A database query language",
                "A CSS framework"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Components and State",
        lessons: [
          {
            id: 5,
            title: "Functional Components",
            content: "Functional components are JavaScript functions that return JSX. They are simpler than class components and are the modern way to write React components with hooks.",
            duration: "12 min",
            type: "text"
          },
          {
            id: 6,
            title: "State with useState Hook",
            content: "Learn how to manage component state using the useState hook. Understand how state triggers re-renders and how to update state properly in functional components.",
            duration: "18 min",
            type: "text"
          },
          {
            id: 7,
            title: "Event Handling",
            content: "Master event handling in React components. Learn about synthetic events, binding methods, and common event patterns for user interactions.",
            duration: "14 min",
            type: "text"
          },
          {
            id: 8,
            title: "Conditional Rendering",
            content: "Learn different techniques for conditional rendering in React including ternary operators, logical && operator, and early returns.",
            duration: "16 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "Components and State Quiz",
          questions: [
            {
              id: 1,
              question: "Which hook is used for state in functional components?",
              options: [
                "useEffect",
                "useState",
                "useContext",
                "useReducer"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "How do you update state in React?",
              options: [
                "Directly modify the state variable",
                "Use the setter function provided by useState",
                "Call this.setState()",
                "Assign a new value to state variable"
              ],
              correctAnswer: 1
            },
            {
              id: 3,
              question: "What is the correct way to handle a button click in React?",
              options: [
                "<button onclick='handleClick()'>Click</button>",
                "<button onClick={handleClick}>Click</button>",
                "<button on-click={handleClick}>Click</button>",
                "<button click={handleClick}>Click</button>"
              ],
              correctAnswer: 1
            },
            {
              id: 4,
              question: "Which syntax is correct for conditional rendering?",
              options: [
                "{if (condition) <Component />}",
                "{condition ? <Component /> : null}",
                "<Component if={condition} />",
                "{condition && <Component />}"
              ],
              correctAnswer: 3
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 2,
    title: "Python Programming",
    description: "Learn Python from scratch - perfect for beginners. Build real-world applications and automate tasks",
    duration: "8 hours",
    level: "Beginner",
    category: "programming",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    modules: [
      {
        id: 1,
        title: "Python Basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to Python",
            content: "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, AI, and automation. Learn about Python's philosophy and installation.",
            duration: "8 min",
            type: "text"
          },
          {
            id: 2,
            title: "Variables and Data Types",
            content: "Learn about Python variables, dynamic typing, and basic data types including integers, floats, strings, booleans, and None. Understand variable naming conventions and type conversion.",
            duration: "12 min",
            type: "text"
          },
          {
            id: 3,
            title: "Control Structures",
            content: "Master if-else statements, for loops, while loops, and conditional expressions. Learn how to control the flow of your Python programs effectively with practical examples.",
            duration: "15 min",
            type: "text"
          },
          {
            id: 4,
            title: "Basic Input/Output",
            content: "Learn how to take user input and display output in Python. Understand the print() function, input() function, and string formatting techniques.",
            duration: "10 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "Python Basics Quiz",
          questions: [
            {
              id: 1,
              question: "Which of these is a valid variable name in Python?",
              options: [
                "my-variable",
                "1variable",
                "my_variable",
                "global"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              question: "What does the 'len()' function do?",
              options: [
                "Returns the length of a string or list",
                "Converts to lowercase",
                "Rounds a number",
                "Creates a list"
              ],
              correctAnswer: 0
            },
            {
              id: 3,
              question: "What is the output of: print(2 ** 3)",
              options: [
                "6",
                "8",
                "23",
                "Error"
              ],
              correctAnswer: 1
            },
            {
              id: 4,
              question: "Which loop is used when you know how many iterations you need?",
              options: [
                "while loop",
                "for loop",
                "do-while loop",
                "repeat loop"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Data Structures",
        lessons: [
          {
            id: 5,
            title: "Lists and Tuples",
            content: "Learn about Python lists (mutable) and tuples (immutable). Understand list methods, slicing, comprehension, and when to use each data structure.",
            duration: "16 min",
            type: "text"
          },
          {
            id: 6,
            title: "Dictionaries and Sets",
            content: "Master dictionaries (key-value pairs) and sets (unique elements). Learn dictionary methods, set operations, and practical use cases for both.",
            duration: "18 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "Data Structures Quiz",
          questions: [
            {
              id: 1,
              question: "Which data structure is mutable?",
              options: [
                "Tuple",
                "String",
                "List",
                "All of the above"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              question: "How do you access a value in a dictionary?",
              options: [
                "By index",
                "By key",
                "By value",
                "By position"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 3,
    title: "Java Programming",
    description: "Master Java programming - from basic syntax to object-oriented concepts and advanced features",
    duration: "10 hours",
    level: "Intermediate",
    category: "programming",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
    modules: [
      {
        id: 1,
        title: "Java Fundamentals",
        lessons: [
          {
            id: 1,
            title: "Java Overview and Setup",
            content: "Java is a powerful, platform-independent, object-oriented programming language. Learn about JVM, JDK, and the write-once-run-anywhere philosophy. Set up your development environment.",
            duration: "12 min",
            type: "text"
          },
          {
            id: 2,
            title: "Basic Syntax and Data Types",
            content: "Understand Java syntax, primitive data types, variables, and type casting. Learn about Java's strong typing system and memory management with practical examples.",
            duration: "16 min",
            type: "text"
          },
          {
            id: 3,
            title: "Control Flow Statements",
            content: "Master if-else statements, switch cases, for loops, while loops, and do-while loops in Java. Learn break and continue statements with real-world scenarios.",
            duration: "18 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "Java Basics Quiz",
          questions: [
            {
              id: 1,
              question: "Which of these is NOT a primitive data type in Java?",
              options: [
                "int",
                "String",
                "boolean",
                "double"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is the entry point of a Java application?",
              options: [
                "main() method",
                "start() method",
                "init() method",
                "run() method"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        lessons: [
          {
            id: 4,
            title: "Classes and Objects",
            content: "Learn the fundamentals of OOP in Java: classes, objects, constructors, and the 'this' keyword. Understand encapsulation and access modifiers with practical examples.",
            duration: "20 min",
            type: "text"
          },
          {
            id: 5,
            title: "Inheritance and Polymorphism",
            content: "Explore inheritance, method overriding, the super keyword, and polymorphism. Understand the 'extends' keyword and method overloading with real-world scenarios.",
            duration: "22 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "OOP Quiz",
          questions: [
            {
              id: 1,
              question: "Which keyword is used for inheritance in Java?",
              options: [
                "inherits",
                "extends",
                "implements",
                "super"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is encapsulation?",
              options: [
                "Hiding implementation details",
                "Inheriting from multiple classes",
                "Creating multiple methods with same name",
                "Converting data types"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 4,
    title: "Database Management (DBMS)",
    description: "Learn database design, SQL queries, normalization, and database administration concepts",
    duration: "9 hours",
    level: "Intermediate",
    category: "database",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    modules: [
      {
        id: 1,
        title: "Database Fundamentals",
        lessons: [
          {
            id: 1,
            title: "Introduction to DBMS",
            content: "Understand what a Database Management System is, its advantages over file systems, and the different types of DBMS (relational, NoSQL, etc.). Learn about ACID properties.",
            duration: "14 min",
            type: "text"
          },
          {
            id: 2,
            title: "Relational Model Concepts",
            content: "Learn about tables, rows, columns, keys (primary, foreign, candidate), and relationships. Understand the concept of relational integrity and constraints.",
            duration: "16 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "DBMS Basics Quiz",
          questions: [
            {
              id: 1,
              question: "What does DBMS stand for?",
              options: [
                "Database Management System",
                "Data Building Management System",
                "Digital Base Management System",
                "Database Modeling System"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Which key uniquely identifies a record in a table?",
              options: [
                "Foreign Key",
                "Primary Key",
                "Candidate Key",
                "Alternate Key"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "SQL Fundamentals",
        lessons: [
          {
            id: 3,
            title: "Basic SQL Queries",
            content: "Learn SELECT statements, WHERE clauses, ORDER BY, and basic filtering. Understand how to retrieve and filter data from database tables with practical examples.",
            duration: "18 min",
            type: "text"
          },
          {
            id: 4,
            title: "Joins and Subqueries",
            content: "Master different types of JOINs (INNER, LEFT, RIGHT, FULL) and learn to write subqueries for complex data retrieval operations with real-world scenarios.",
            duration: "22 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "SQL Quiz",
          questions: [
            {
              id: 1,
              question: "Which JOIN returns all records from the left table?",
              options: [
                "INNER JOIN",
                "LEFT JOIN",
                "RIGHT JOIN",
                "FULL JOIN"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is the difference between WHERE and HAVING?",
              options: [
                "WHERE filters rows, HAVING filters groups",
                "WHERE filters groups, HAVING filters rows",
                "No difference",
                "WHERE is for SELECT, HAVING is for UPDATE"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 5,
    title: "C Programming",
    description: "Master the C programming language - the foundation of modern programming languages and systems",
    duration: "7 hours",
    level: "Beginner",
    category: "programming",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    modules: [
      {
        id: 1,
        title: "C Language Basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to C",
            content: "C is a powerful general-purpose programming language used for system programming, embedded systems, and performance-critical applications. Learn about its history and importance.",
            duration: "10 min",
            type: "text"
          },
          {
            id: 2,
            title: "Data Types and Variables",
            content: "Learn about C's basic data types, variable declaration, constants, and the printf/scanf functions for input/output operations with practical examples.",
            duration: "14 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "C Basics Quiz",
          questions: [
            {
              id: 1,
              question: "Which header file is needed for printf()?",
              options: [
                "<iostream>",
                "<stdio.h>",
                "<conio.h>",
                "<stdlib.h>"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is the size of int in C?",
              options: [
                "2 bytes",
                "4 bytes",
                "8 bytes",
                "Depends on compiler"
              ],
              correctAnswer: 3
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Functions and Pointers",
        lessons: [
          {
            id: 3,
            title: "Functions in C",
            content: "Learn to define and call functions, understand function prototypes, parameters, return values, and recursion in C programming.",
            duration: "16 min",
            type: "text"
          },
          {
            id: 4,
            title: "Pointers and Memory",
            content: "Master pointers - the most powerful feature of C. Learn pointer arithmetic, dynamic memory allocation, and pointer to functions.",
            duration: "18 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "Functions & Pointers Quiz",
          questions: [
            {
              id: 1,
              question: "What does the '&' operator do?",
              options: [
                "Logical AND",
                "Address of operator",
                "Bitwise AND",
                "Reference operator"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "How do you allocate memory dynamically?",
              options: [
                "malloc()",
                "alloc()",
                "new",
                "create()"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 6,
    title: "JavaScript Fundamentals",
    description: "Learn JavaScript - the language of the web. Build interactive websites and understand modern JS features",
    duration: "6 hours",
    level: "Beginner",
    category: "web",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    modules: [
      {
        id: 1,
        title: "JavaScript Basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to JavaScript",
            content: "JavaScript is a versatile programming language that runs in web browsers. Learn its role in web development and basic syntax with hands-on examples.",
            duration: "10 min",
            type: "text"
          },
          {
            id: 2,
            title: "Variables and Data Types",
            content: "Understand var, let, const declarations, primitive types, objects, and type coercion in JavaScript. Learn about hoisting and scope with practical examples.",
            duration: "14 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "JavaScript Basics Quiz",
          questions: [
            {
              id: 1,
              question: "Which keyword creates a constant variable?",
              options: [
                "var",
                "let",
                "const",
                "constant"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              question: "What is the result of '2' + 2 in JavaScript?",
              options: [
                "4",
                "22",
                "NaN",
                "Error"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "DOM Manipulation",
        lessons: [
          {
            id: 3,
            title: "Working with DOM",
            content: "Learn to select, create, and modify HTML elements using JavaScript. Understand event handling and dynamic content updates with practical examples.",
            duration: "17 min",
            type: "text"
          },
          {
            id: 4,
            title: "Event Handling",
            content: "Master event listeners, event objects, event bubbling and capturing. Learn to handle user interactions effectively in web applications.",
            duration: "16 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "DOM Quiz",
          questions: [
            {
              id: 1,
              question: "Which method selects an element by ID?",
              options: [
                "document.querySelector()",
                "document.getElementById()",
                "document.getElementByClass()",
                "document.findElement()"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is event bubbling?",
              options: [
                "Events moving from target to document root",
                "Events creating multiple copies",
                "Events that repeat automatically",
                "Events that change element size"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 7,
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms - essential for coding interviews and efficient programming",
    duration: "12 hours",
    level: "Advanced",
    category: "cs-fundamentals",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    modules: [
      {
        id: 1,
        title: "Basic Data Structures",
        lessons: [
          {
            id: 1,
            title: "Arrays and Linked Lists",
            content: "Understand array implementation, dynamic arrays, singly/doubly linked lists, and their time complexity for various operations with code examples.",
            duration: "22 min",
            type: "text"
          },
          {
            id: 2,
            title: "Stacks and Queues",
            content: "Learn stack (LIFO) and queue (FIFO) data structures, their implementations using arrays and linked lists, and common applications in real-world scenarios.",
            duration: "20 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "Data Structures Quiz",
          questions: [
            {
              id: 1,
              question: "What is the time complexity of accessing an element in an array?",
              options: [
                "O(1)",
                "O(n)",
                "O(log n)",
                "O(n²)"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Which principle does Stack follow?",
              options: [
                "FIFO",
                "LIFO",
                "Round Robin",
                "Priority"
              ],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Sorting Algorithms",
        lessons: [
          {
            id: 3,
            title: "Basic Sorting Algorithms",
            content: "Learn bubble sort, selection sort, and insertion sort. Understand their time and space complexity and when to use each algorithm with practical examples.",
            duration: "21 min",
            type: "text"
          },
          {
            id: 4,
            title: "Advanced Sorting",
            content: "Master merge sort, quick sort, and heap sort. Understand divide-and-conquer approach and their performance characteristics in different scenarios.",
            duration: "23 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "Algorithms Quiz",
          questions: [
            {
              id: 1,
              question: "Which sorting algorithm has O(n log n) average case?",
              options: [
                "Bubble Sort",
                "Insertion Sort",
                "Quick Sort",
                "Selection Sort"
              ],
              correctAnswer: 2
            },
            {
              id: 2,
              question: "What is the best case time complexity of bubble sort?",
              options: [
                "O(n)",
                "O(n log n)",
                "O(n²)",
                "O(1)"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  },
  {
    id: 8,
    title: "Web Development",
    description: "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks",
    duration: "14 hours",
    level: "Beginner",
    category: "web",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    modules: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        lessons: [
          {
            id: 1,
            title: "HTML Structure",
            content: "Learn HTML5 semantic elements, forms, tables, and accessibility features. Understand the document structure and proper markup with hands-on examples.",
            duration: "16 min",
            type: "text"
          },
          {
            id: 2,
            title: "CSS Styling",
            content: "Master CSS selectors, box model, flexbox, grid layout, and responsive design principles. Learn to create modern, responsive layouts for web applications.",
            duration: "18 min",
            type: "text"
          }
        ],
        quiz: {
          id: 1,
          title: "HTML/CSS Quiz",
          questions: [
            {
              id: 1,
              question: "Which HTML5 tag is used for navigation?",
              options: [
                "<nav>",
                "<menu>",
                "<navigation>",
                "<navigate>"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "What does CSS stand for?",
              options: [
                "Computer Style Sheets",
                "Creative Style System",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
              ],
              correctAnswer: 2
            }
          ],
          passingScore: 70
        }
      },
      {
        id: 2,
        title: "Modern JavaScript",
        lessons: [
          {
            id: 3,
            title: "ES6+ Features",
            content: "Learn modern JavaScript features: arrow functions, template literals, destructuring, spread operator, and modules with practical coding examples.",
            duration: "19 min",
            type: "text"
          },
          {
            id: 4,
            title: "Async JavaScript",
            content: "Master callbacks, promises, async/await, and fetch API. Understand asynchronous programming in JavaScript for building responsive web applications.",
            duration: "21 min",
            type: "text"
          }
        ],
        quiz: {
          id: 2,
          title: "Modern JS Quiz",
          questions: [
            {
              id: 1,
              question: "Which keyword is used with async functions?",
              options: [
                "await",
                "async",
                "wait",
                "pause"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "What does the spread operator (...) do?",
              options: [
                "Copies array elements",
                "Spreads CSS styles",
                "Creates infinite loops",
                "Expands HTML elements"
              ],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        }
      }
    ]
  }
];

// For backward compatibility, export the first course as default
export const courseData = coursesData[0];