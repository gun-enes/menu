import CategoryList from "./Categories/CategoryList"
import ListView from "./ListView/ListView.tsx";
import SettingsFetch from "../hooks/SettingsFetch.tsx";

function HomePage() {
    const {settings} = SettingsFetch();
    return (
      <>
          {settings ? (
              settings.menuType == "ListView" ?
                  <ListView />
              : <CategoryList />) : <CategoryList />
          }

      </>
  )
}

export default HomePage;