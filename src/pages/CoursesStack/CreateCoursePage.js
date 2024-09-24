import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {CreateCourseForm} from "../../components/createCourseComponents/CreateCourseForm";

export const CreateCoursePage = () => {
    return (
        <ActiveAreaWrapper
            isPageWithKeyboard={true}
            myStyle={{
                flex: 1,
            }}
        >
            <CreateCourseForm />
        </ActiveAreaWrapper>
    )
}
