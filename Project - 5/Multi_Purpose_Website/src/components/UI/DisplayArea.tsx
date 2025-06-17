import { Copy } from "lucide-react";


interface DisplayAreaProps {
  title: string;
  content: string;
  className?: string;
  size?: string;
  onClick: ()=> void;
}
function DisplayArea({ title, content, className = "", size, onClick }:DisplayAreaProps) {
  return (
    <div className={`border border-border rounded-lg bg-background ${className}`}>
      <div className="flex gap-2 items-center px-4 py-2 border-b border-border bg-accent">
        <h3 className="font-medium text-accent-foreground">{title}</h3>
        <Copy cursor={"pointer"} size={size} onClick={onClick}/>
      </div>
      <div className="p-4">
        <pre className="whitespace-pre-wrap text-foreground">{content}</pre>
      </div>
    </div>
  );
};

export default DisplayArea;
