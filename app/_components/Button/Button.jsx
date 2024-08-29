'use client'

const Button = ({bg, text, btnSize, textSize}) => {
    return (
      <button
      style={{
        backgroundColor: bg
      }}
        className={`text-white rounded active:scale-75 transition-all duration-300 ${btnSize == 'sm' && "px-2 py-1"} ${ btnSize == 'md' && "px-4 py-2" } ${ btnSize == 'lg' && "px-6 py-3" } ${textSize == 'sm' && "text-xs"} ${ textSize == 'md' && "text-base" } ${ textSize == 'lg' && "text-lg" }`}
      >
        {text}
      </button>
    );
};

export default Button;