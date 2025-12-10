import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { contact, items, total } = body;

		const itemsList = items
			.map(
				(i: any, index: number) =>
					`${index + 1}. <b>${i.name}</b>\n   Размер: ${i.selectedSize.height}\n   Цена: ${i.selectedSize.price} ₸ x ${i.quantity} шт.`
			)
			.join("\n\n");

		const message = `
🎄 <b>НОВЫЙ ЗАКАЗ NOËL</b> 🎄

👤 <b>Клиент:</b> ${contact.name}
📞 <b>Телефон:</b> ${contact.phone}
💬 <b>Коммент:</b> ${contact.comment || "Нет"}

🛒 <b>Товары:</b>
${itemsList}

💰 <b>Итого:</b> ${new Intl.NumberFormat("ru-RU").format(total)} ₽
    `;

		const token = process.env.TELEGRAM_BOT_TOKEN;
		const chatId = process.env.TELEGRAM_CHAT_ID;
		const url = `https://api.telegram.org/bot${token}/sendMessage`;

		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
				parse_mode: "HTML",
			}),
		});

		if (response.ok) {
			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json({ error: "Telegram Error" }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}
}
