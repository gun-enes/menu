import { useAppContext } from "../../pages/AppProvider.tsx";
import { useLocation } from "react-router-dom";
import {getCategoryBySlug} from "../../api/Categories.tsx";
import CustomButton from "../CustomButton.tsx";
import GoBackButton from "./GoBackButton.tsx";
import CustomSwitch from "./CustomSwitch.tsx";
import SettingsFetch from "../../hooks/SettingsFetch.tsx";

export default function Navbar() {
    const { header, setHeader } = useAppContext(); // Added arrange to context
    const {settings} = SettingsFetch();
    const location = useLocation();

    const handleGoBack = () => {
        window.location.href = "/";
    };
    const handleEditMenu = () => {
        window.location.href = "/edit-menu";
    }

    if (location.pathname === "/") {
        setHeader("Menü");
    }
    else if(location.pathname === "/edit-menu"){
        setHeader("Menüyü Düzenle")
    }
    else{
        getCategoryBySlug(location.pathname.replace("/", "")).then((category) => {
            setHeader(category.title);
        });
    }

    return (
        <nav style={{
            background: 'linear-gradient(90deg, #f1356d, #e91e63)',
            padding: '20px 5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>

            {/*Go back button*/}
            <div className="container">
                <div className="row align-items-start">
                    <div className="d-flex justify-content-between w-100">
                        <GoBackButton header={settings ? settings.businessName + " " + header: header} handleGoBack={handleGoBack}/>

                        {location.pathname === "/" && <CustomButton text={"Edit menü"} buttonBehaviour={()=> {
                            handleEditMenu();
                        }}/>
                        }

                        {location.pathname === "/edit-menu" &&
                            <CustomSwitch/>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}