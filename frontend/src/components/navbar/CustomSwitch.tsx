import SettingsFetch from "../../hooks/SettingsFetch.tsx";

export default function CustomSwitch() {
    const {settings, updateSetting} = SettingsFetch();
    return (
        <label style={{margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
            <span style={{color: 'white', marginRight: '8px'}}>Menü Görünümü</span>
            <div style={{position: 'relative'}}>
                <input
                    type="checkbox"
                    checked={true} // Add checked prop
                    onChange={() => {
                        settings && settings._id && updateSetting(
                            settings._id,
                            {
                                ...settings,
                                menuType: settings.menuType === "ListView" ? "CategoryList" : "ListView"
                            }
                        );
                    }} // Add onChange event
                    style={{
                        opacity: 0,
                        width: 0,
                        height: 0,
                        position: 'absolute'
                    }}
                />
                <div style={{
                    width: '40px',
                    height: '24px',
                    backgroundColor: settings && settings.menuType === "ListView" ? '#ffffff80' : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '2px',
                        left: settings && settings.menuType === "ListView" ? '18px' : '2px', // Animate based on state
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: 'left 0.2s',
                    }}/>
                </div>
            </div>
        </label>

    )
}


















