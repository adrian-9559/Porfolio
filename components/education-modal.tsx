import { Chip, Modal } from "@heroui/react";

interface EducationModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	education: {
		institution: string;
		program: string;
		year: string;
		description: string;
		subjects: string[];
		icon: string;
	};
}

export function EducationModal({ isOpen, onOpenChange, education }: EducationModalProps) {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog className="dark:bg-gray-900">
						<Modal.Header className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
							<div className="text-3xl">{education.icon}</div>
							<div className="flex-1">
								<h2 className="text-2xl font-bold">{education.institution}</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">{education.program}</p>
							</div>
							<Modal.CloseTrigger />
						</Modal.Header>

						<Modal.Body className="gap-6 py-6">
							<div className="space-y-2">
								<p className="text-sm font-semibold text-gray-600 dark:text-gray-400">PERÍODO</p>
								<p className="text-lg font-bold text-blue-600 dark:text-blue-400">{education.year}</p>
							</div>

							<div className="space-y-2">
								<p className="text-sm font-semibold text-gray-600 dark:text-gray-400">DESCRIPCIÓN</p>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">{education.description}</p>
							</div>

							{education.subjects && education.subjects.length > 0 && (
								<div className="space-y-3">
									<p className="text-sm font-semibold text-gray-600 dark:text-gray-400">TEMAS Y HABILIDADES</p>
									<div className="flex flex-wrap gap-2">
										{education.subjects.map((subject, idx) => (
											<Chip
												key={idx}
												className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
												size="sm"
											>
												{subject}
											</Chip>
										))}
									</div>
								</div>
							)}
						</Modal.Body>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
