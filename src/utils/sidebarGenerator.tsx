import { NavLink } from "react-router-dom";
import { TSideBarItems, TUserPath } from "../types";

export const sidebarGenerator = (items: TUserPath[], role: string) => {
    const sideBarItemsGenerator = items.reduce((acc: TSideBarItems[], items) => {
        if (items.path && items.name) {
            acc.push({
                key: items.name,
                label: <NavLink to={`/${role}/${items.path}`}> {items.name} </NavLink>
            })
        }
        if (items.children) {
            acc.push({
                key: items.name,
                label: items.name,
                children: items?.children?.map(child => {
                    if (child?.name) {
                        return {
                            key: child.name,
                            label: <NavLink to={`/${role}/${child.path}`} > {child.name} </NavLink>
                        }
                    }
                })
            })
        }

        return acc;
    }, [])

    return sideBarItemsGenerator
}