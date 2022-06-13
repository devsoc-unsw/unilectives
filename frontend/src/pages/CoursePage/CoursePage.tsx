import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";

type ParamTypes = {
    courseCode: string
} 

const CoursePage = () => {
    const { courseCode } = useParams<keyof ParamTypes>() as ParamTypes;

    return (
        <div>
            <CourseHeader 
                courseCode={courseCode}
                overallRating={3.4}
                enjoyabilityRating={4.1} 
                usefulnessRating={3.5}
                manageabilityRating={3.4}
                noReviews={22}    
            />
        </div>
    );
};

export default CoursePage;
