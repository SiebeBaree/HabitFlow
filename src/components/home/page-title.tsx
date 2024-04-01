type PageTitleProps = {
    title: string;
    id?: string;
    children?: React.ReactNode;
};

export default function PageTitle({ title, id, children }: PageTitleProps) {
    return (
        <div id={id} className="mx-auto mb-20 max-w-[600px] text-center">
            <h2>{title}</h2>
            {children ? children : null}
        </div>
    );
}
