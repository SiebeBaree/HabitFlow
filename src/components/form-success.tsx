import { CircleCheckIcon } from "lucide-react";

type FormSuccessProps = {
    message?: string;
};

export function FormSuccess({ message }: FormSuccessProps) {
    if (!message) {
        return null;
    }

    return (
        <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm font-medium text-emerald-500">
            <CircleCheckIcon size={16} />
            <span>{message}</span>
        </div>
    );
}
