type SpinnerProps = {
  size?: number;
  color?: string;
};

function Spinner({ size = 20, color = "text-white" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-2 border-t-transparent ${color} rounded-full animate-spin`}
        style={{
          width: size,
          height: size,
          animationDuration: "0.7s",
        }}
      ></div>
    </div>
  );
}

export default Spinner;
