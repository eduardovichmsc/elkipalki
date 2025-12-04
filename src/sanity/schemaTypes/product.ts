import { defineField, defineType } from "sanity";
import { Trees } from "lucide-react"; // Иконка для меню

export const product = defineType({
	name: "product",
	title: "Елки",
	type: "document",
	icon: Trees as any,
	fields: [
		defineField({
			name: "name",
			title: "Название",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug (ссылка)",
			type: "slug",
			options: { source: "name" },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "latinName",
			title: "Латинское название",
			type: "string",
		}),
		defineField({
			name: "shortDesc",
			title: "Краткое описание (для карточки)",
			type: "text",
			rows: 2,
		}),
		defineField({
			name: "description",
			title: "Полное описание",
			type: "text",
		}),
		defineField({
			name: "startPrice",
			title: "Цена ОТ",
			type: "number",
		}),
		// Группа изображений
		defineField({
			name: "mainImage",
			title: "Главное фото",
			type: "image",
			options: { hotspot: true }, // Позволяет выбирать фокусную точку
		}),
		defineField({
			name: "hoverImage",
			title: "Фото при наведении",
			type: "image",
			options: { hotspot: true },
		}),
		// Характеристики
		defineField({
			name: "specs",
			title: "Характеристики",
			type: "object",
			fields: [
				defineField({ name: "origin", title: "Страна", type: "string" }),
				defineField({ name: "color", title: "Цвет", type: "string" }),
				defineField({
					name: "needleSoftness",
					title: "Мягкость иголок",
					type: "string",
					options: { list: ["Soft", "Medium", "Prickly"] },
				}),
			],
		}),
		// Размеры и цены
		defineField({
			name: "sizes",
			title: "Варианты размеров",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "height",
							title: "Высота (строка, напр '150-175 см')",
							type: "string",
						}),
						defineField({ name: "price", title: "Цена", type: "number" }),
						defineField({
							name: "available",
							title: "В наличии",
							type: "boolean",
							initialValue: true,
						}),
					],
				},
			],
		}),
		// Теги
		defineField({
			name: "tags",
			title: "Теги",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Bestseller", value: "bestseller" },
					{ title: "New", value: "new" },
					{ title: "Limited", value: "limited" },
				],
			},
		}),
	],
});
