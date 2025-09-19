import { motion } from "framer-motion";

import DesarrolloAplicacionesWeb from "@/components/desarrolloAplicacionesWeb";
import MadridTelefonica from "@/components/madridTelefonica";
import SistemasMicroinformaticos from "@/components/sistemasMicroinformaticos";
import { useI18n } from "@/utils/i18n";

export default function Experience() {
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
	};

	return (
		<motion.section className="grid xl:flex gap-12 lg:gap-20 w-full" variants={containerVariants} initial="hidden" animate="visible">
			{/* Education Section */}
			<motion.div className="flex flex-col gap-6 w-full" variants={itemVariants}>
				<h2 className="text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
					{t('experience.education_title', 'Formación Académica')}
				</h2>
				<div className="flex flex-col gap-6">
					<MadridTelefonica />
					<DesarrolloAplicacionesWeb />
					<SistemasMicroinformaticos />
				</div>
			</motion.div>
		</motion.section>
	);
}
