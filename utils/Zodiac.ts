export function zodiac(date:string) {
    let zodiac = ""
    const monthDay = date.split('-').slice(1).join('-'); // Extract MM-DD from YYYY-MM-DD

    switch (true) {
        case monthDay >= '03-21' && monthDay <= '04-19':
            zodiac = "Aries";
            break;
        case monthDay >= '04-20' && monthDay <= '05-20':
            zodiac = "Taurus";
            break;
        case monthDay >= '05-21' && monthDay <= '06-20':
            zodiac = "Gemini";
            break;
        case monthDay >= '06-21' && monthDay <= '07-22':
            zodiac = "Cancer";
            break;
        case monthDay >= '07-23' && monthDay <= '08-22':
            zodiac = "Leo";
            break;
        case monthDay >= '08-23' && monthDay <= '09-22':
            zodiac = "Virgo";
            break;
        case monthDay >= '09-23' && monthDay <= '10-22':
            zodiac = "Libra";
            break;
        case monthDay >= '10-23' && monthDay <= '11-21':
            zodiac = "Scorpio";
            break;
        case monthDay >= '11-22' && monthDay <= '12-21':
            zodiac = "Sagittarius";
            break;
        case (monthDay >= '12-22' && monthDay <= '12-31') || (monthDay >= '01-01' && monthDay <= '01-19'):
            zodiac = "Capricorn";
            break;
        case monthDay >= '01-20' && monthDay <= '02-18':
            zodiac = "Aquarius";
            break;
        case monthDay >= '02-19' && monthDay <= '03-20':
            zodiac = "Pisces";
            break;
        default:
            zodiac = "";
            break;
    }

    return zodiac

}