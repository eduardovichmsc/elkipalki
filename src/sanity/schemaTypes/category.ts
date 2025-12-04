import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";

export const category = defineType({
	name: "category",
	title: "Категории",
	type: "document",
	icon: Tag as any,
	fields: [
		defineField({
			name: "title",
			title: "Название",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug (для фильтрации)",
			type: "slug",
			options: { source: "title" },
			validation: (Rule) => Rule.required(),
		}),
	],
});
