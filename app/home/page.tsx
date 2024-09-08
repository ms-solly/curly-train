import { Home } from "@/components/component/home";
import { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home | Esportws',
  description: 'Discover a seamless experience with Esportws, where you can easily track live sports events, explore upcoming matches, and stay updated with the latest scores. Start your journey now and never miss a moment of the action!',
}
export const viewport: Viewport = {
  themeColor: 'black',
}
export default function homepg(){
  return(
  <Home/>
  )
}