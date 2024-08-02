export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "DOTA 2",
  description:
    "Stay up-to-date with the latest in Dota 2 esports. ",
  mainNav: [
    {
      title: "Home",
      href: "/home",
    },
  ],
  homeNav: [
    {
      title:"Matches",
      href:"/matches"
    }
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "",
  },
}
