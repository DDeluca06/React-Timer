import NavBar from "../components/ui/Navbar";
import SettingsPanel from "../components/settings/SettingsPanel"

function Settings() {
    return (
        <div className="page-container">
            <NavBar />
                <h1>Settings</h1>
                <SettingsPanel />
        </div>
    );
}

export default Settings;