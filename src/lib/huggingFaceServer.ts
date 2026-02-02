export async function generateDealTitle(
  caption: string
): Promise<string | null> {
  const result = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
        temperature: 0.3, // determines "creativity" of ouptput
        max_tokens: 16,
        messages: [
          {
            role: 'user',
            content: `Give me one short title for the promotional deal in this Instagram post:\n${caption}`,
          },
        ],
      }),
    }
  );

  if (!result.ok) {
    console.error('Hugging Face API error:', await result.text());
    return null;
  }

  const json = await result.json();
  return json.choices?.[0]?.message?.content?.trim() ?? null;
}
