import type { Post, PostCollection } from "@/types/postType";

function parseDate(dateStr: string): Date {
	const [day, month, year, time] = dateStr.split("/");
	const [hours, minutes] = time.split(":");

	return new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hours),
		Number(minutes)
	);
}

function getLatestPost(obj: Post[] | PostCollection): Post | null {
	let latestPost: Post | null = null;

	function traverse(current: Post[] | PostCollection) {
		if (Array.isArray(current)) {
			for (const item of current) {
				if (
					!latestPost ||
					parseDate(item.create) > parseDate(latestPost.create)
				) {
					latestPost = item;
				}
			}
			return;
		}

		for (const value of Object.values(current)) {
			traverse(value);
		}
	}

	traverse(obj);

	return latestPost;
}

export { getLatestPost };
