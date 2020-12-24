export default function isLoggedIn() {
    let token = localStorage.getItem("khawater")
    if (token) {
        return true
    }
    else return false;
}
