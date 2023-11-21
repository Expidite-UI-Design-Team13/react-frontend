import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";

export function AddItem() {
    return (
        <div>
            <Header title="New Item" />
            <NavBar tab="add" />
        </div>
    );
}