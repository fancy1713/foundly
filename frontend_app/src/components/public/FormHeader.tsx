import { Button, Typography } from "antd";
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";

const { Text } = Typography

interface FormHeaderProps {
    title: string;
}

function FormHeader(props: FormHeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button
                    type="default"
                    className="rounded-full! w-10! h-10! p-0!"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft size={20} />
                </Button>
                <Text className="m-0! text-[22px]! font-medium! text-gray-700!">
                    {props.title || "Header Title"}
                </Text>
            </div>
        </header>
    )
}

export default FormHeader