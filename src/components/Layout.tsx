import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type LayoutPropsType = {
    notes: Note[];
};
// Url'den aldığı id'ye göre doğru notu bulacak
// Ve bu notun bilgisini bütün çocuk root'lara aktaracak
const Layout = ({ notes }: LayoutPropsType) => {
    const { id } = useParams();

    // note'u bul
    const found = notes.find((n) => n.id === id);

    // not bulunmazsa anasayfaya yönlendir
    if(!found) return <Navigate to={'/'} replace />;

    // alt route'u ekrana basma ve url'e göre 
    // aldığımız notu prop gönderme
    return (
        <Outlet context={found} />
    );
};

export default Layout;