import NavBar from "../components/ui/NavBar";

function About() {
    return (
        // About us, what we're doing, what we're trying to do
        <div className="page-container">
            <NavBar />
            <h1>About Us</h1>
            <p>Welcome to our app! We're a simple group trying to help you keep your habits in place, while we handle the heavy lifting. Just remember to come back to us, and don't break your streak!</p>

            {/* Contact */}
            <h1>Contact</h1>
            <p>If you have any questions or feedback, please contact us at <a href="mailto:contact@timewise.com">contact@timewise.com</a>.</p>
        </div>
    );
}

export default About;