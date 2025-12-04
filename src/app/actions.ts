"use server";

type OrderData = {
	name: string;
	phone: string;
	address: string;
	cartItems: { name: string; quantity: number; price: number }[];
	total: number;
};

export async function submitOrder(data: OrderData) {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;

	if (!token || !chatId) {
		return { success: false, message: "Ошибка конфигурации сервера" };
	}

	// Формируем сообщение
	const itemsList = data.cartItems
		.map(
			(item) =>
				`- ${item.name} x${item.quantity} (${item.price * item.quantity} ₽)`
		)
		.join("\n");

	const message = `
🎄 <b>Новый заказ!</b>

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
📍 <b>Адрес:</b> ${data.address}

🛒 <b>Товары:</b>
${itemsList}

💰 <b>Итого:</b> ${data.total} ₽
  `;

	try {
		const res = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: "HTML",
				}),
			}
		);

		if (!res.ok) throw new Error("Telegram API Error");

		return { success: true };
	} catch (e) {
		console.error(e);
		return { success: false, message: "Не удалось отправить заказ" };
	}
}
