# React 
- ## Components in react:
    Components are the core of React. Everything in React is a component.<br>There are two ways to create a React component:

    **1) Stateless Functional Component** :- 
    - To create a component with a function, you simply write a JavaScript function that returns either JSX or null.
    - One important thing to note is that React requires your function name to begin with a capital letter. 
    
            const MyComponent = function() {
                // Change code below this line
                return (
                    <div>
                        <p>This is some text to return.</p>
                    </div>
                );
                // Change code above this line
            }
    **2) Stateless Class Component** :-
    -  In the following example, ``Kitten`` extends ``React.Component``:

            class Kitten extends React.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return (
                    <h1>Hi</h1>
                    );
                }
            }
    - the Kitten class now has access to many useful React features, such as local state and lifecycle hooks.
    - Kitten class has a constructor defined within it that calls ``super()``. <br>It uses ``super()`` to call the constructor of the parent class, in this case ``React.Component``.
- ## Nesting components in react:
            return (
                <App>
                <Navbar />
                <Dashboard />
                <Footer />
                </App>
            )
- ## Rendering a React Component using ReactDOM.render():
    - Syntax: 
    
            ReactDOM.render(componentToRender, targetNode)
- ## Properties (props) in components:
            <App>
                <Welcome user='Mark' />
            </App>

    - here ``user`` is the property passed to the component ``Welcome``.
            
            const Welcome = (props) => {
                return (<h1>Hello, {props.user}!</h1>);
            }
    -  To pass an array to a JSX element, it must be treated as JavaScript and wrapped in curly braces.

            <ParentComponent>
                <ChildComponent colors={["green", "blue", "red"]} />
            </ParentComponent>
            
            // Another Example of Todo list
            const List = (props) => {
                { /* Change code below this line */ }
                    return <p>{props.tasks.join(",")}</p>
                { /* Change code above this line */ }
            };

            class ToDo extends React.Component {
                constructor(props) {
                    super(props);
            }
            render() {
                return (
                <div>
                    <h1>To Do Lists</h1>
                    <h2>Today</h2>
                    { /* Change code below this line */ }
                    <List tasks={["t1","t2"]}/>
                    <h2>Tomorrow</h2>
                    <List tasks={["t1","t2","t3"]}/>
                    { /* Change code above this line */ }
                </div>
                );
            }
            };
    - **Default Props**: 

            MyComponent.defaultProps = { location:'Francisco' }
    - 