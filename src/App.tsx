import "./App.css";
import Login from "./pages/Login";
import illustration from "./img/ngunhubo.png";


function App() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Login />
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <img
          src={illustration}
          alt="Login illustration"
          className="w-60 h-60 object-contain animate-spin"
        />
      </div>
      
    </div>
  );
}

export default App;
