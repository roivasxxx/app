export default function CustomIcon({
    className,
    clickable = false,
    onClick,
    ...rest
}) {
    return clickable ? (
        <button className={className} onClick={onClick}>
            <SvgTemplate {...rest} />
        </button>
    ) : (
        <div className={className}>
            <SvgTemplate {...rest} />
        </div>
    )
}

const SvgTemplate = ({ icon, style, size }) => (
    <svg
        className="no_drag fill-current h-6 align-middle m-2"
        style={style}
        viewBox="0 0 24 24"
        width={`${size}px`}
        height={`${size}px`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d={icons[icon]} />
    </svg>
)

const icons = {
    close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    minify: 'M6 19h12v2H6z',
    maximize: 'M3,3v18h18V3H3z M19,19H5V5h14V19z',
}
