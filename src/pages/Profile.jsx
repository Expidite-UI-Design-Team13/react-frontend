import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";

export function Profile() {
    return (
        <div>
            <Header title="Profile" />
            <NavBar tab="profile" />
        </div>
    );
}