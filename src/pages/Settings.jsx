import NavBar from "../components/ui/Navbar";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";

function Settings() {
    return (
        <div className="page-container">
            <NavBar />
            <h1>Settings</h1>
            <ThemeSwitcher />
        </div>
    );
}

export default Settings;