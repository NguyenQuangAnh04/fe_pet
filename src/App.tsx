import "./App.css";
import Login from "./pages/Login";
import illustration from "./img/ngunhubo.png";

function App() {
  return (
    <div className="flex w-full h-screen bg-[#f7c883] items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] max-w-5xl overflow-hidden">
        <div className="w-1/2 bg-[#FDE3B7] flex items-center justify-center p-8">
          <img
            src={illustration}
            alt="Login illustration"
            className="w-72 h-72 object-contain"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-10">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
