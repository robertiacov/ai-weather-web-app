import { NextResponse } from "next/server";
import openai from "@/openai"

export async function POST(request: Request){
    // Weatherdata in the body of the POST req
    const { weatherData } = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        max_tokens: 500,
        // stop: ['},'],
        messages:[
            {
                role: 'system',
                content: `Pretend you're a weather news presenter. Be energetic and full of charisma. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand an know what to do to prepare for those weather conditions such as wear SPF if the UV is high or to pick an umbrella if there is a high change of raining etc. Use the uv_index data provided to provide the UV advice and the precipitation_probability data provided to provide the raining advice. Limit the response to 150 characters`,
            }, {
                role: 'user',
                content: `Hi there, can i get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(weatherData)}.`,
            }
        ]
    })

    const {data} = response;

    console.log('DATA IS: ', data);
    
    return NextResponse.json(data.choices[0].message);
}