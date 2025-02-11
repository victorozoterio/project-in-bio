import Hero from "../components/landing-page/hero";
import Header from "../components/landing-page/header";
import VideoExplanation from "../components/landing-page/video-explanation";
import Pricing from "../components/landing-page/pricing";
import FAQ from "../components/landing-page/faq";
import { trackServerEvent } from "../lib/mixpanel";
import { getSEOTags } from "../lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
	appName: "ProjectInBio",
	appDescription:
		"ProjectInBio - Seus projetos e redes sociais em um único link",
	keywords: ["ProjectInBio", "projetos", "redes sociais", "link"],
	appDomain: "https://www.projectinbio.com.br",
	canonicalUrlRelative: "/",
});

export default function Home() {
	trackServerEvent("page_view", {
		page: "home",
	});

	return (
		<div className="max-w-7xl mx-auto">
			<Header />
			<Hero />
			<VideoExplanation />
			<Pricing />
			<FAQ />
		</div>
	);
}
