import { useGetAllFacultiesCourseQuery } from "../../redux/features/faculty/facultyCourses.api";



const MyCourses = () => {
    const { data } = useGetAllFacultiesCourseQuery(undefined);
    console.log(data)
    return (
        <div>
            <h2>This is MyCourses Components</h2>
        </div>
    );
};

export default MyCourses;
