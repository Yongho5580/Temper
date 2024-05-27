import Script from "next/script";

export default function Layout({ children }) {
    return (
        <>
        <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOJSKEY}&libraries=services,clusterer&autoload=false`} strategy="beforeInteractive"/>
        {children}
        </>
    )
}