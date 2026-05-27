# Hero Background — Prompt estruturado (Visual Generator)

> Pronto para usar quando a API do Gemini liberar.
> Habilitar billing em: https://aistudio.google.com/apikey

## Prompt principal (recomendado)

```
Subject: Empty luxurious penthouse executive office at twilight, no people visible

Style: Cinematic editorial photography, photorealistic, large-format film aesthetic, architectural digest meets film noir

Mood: Authoritative, contemplative, quiet power, late-night operating hours, the calm before scale

Lighting: Single warm golden ambient light source (vintage Edison desk lamp or hidden cove lighting), atmospheric haze in the air, deep shadow play, subtle rim lighting on furniture edges, no overhead lighting

Composition: Wide-angle, slightly elevated point of view, floor-to-ceiling window dominating the right two-thirds of the frame, distant city skyline visible through window as horizontal cluster of soft golden urban lights, sparse minimalist desk in foreground (silhouette), dark wood paneling on left wall

Color palette: Deep charcoal blacks (#0A0A0A), warm cognac browns (#2D1810 to #4A2B0C), single muted gold accent (#9B6A05 to #D4AF37), absolutely no other colors

Technical: 16:9 aspect ratio, 2K resolution, shallow depth of field with focus on middle-distance, photographic film grain, no text overlays, no logos

Negative prompts (avoid):
- people, person, human, figure, silhouette of person
- modern minimalism, scandinavian, all-white, bright office
- neon lights, cyber, futuristic, sci-fi
- vibrant colors, blue, green, purple, red, pink
- technology screens, monitors, laptops visible
- AI-generated artifacts, distorted geometry, warped perspective
- cluttered, messy, papers everywhere
- daylight, sunrise, sunny
```

## Comando

```bash
cd /Users/andre/metodo-rage-lp/assets
nano-banana "$(cat <prompt_inline>)" -o hero_bg_v2 -s 2K -a 16:9 --model pro
```

## Variantes alternativas (testar 2-3 e escolher)

### Variante B — Skyline noturno apenas
```
Subject: Aerial nighttime view of major financial district skyline, no people
Style: Cinematic dark photography, brooding moody
Lighting: City lights as primary illumination, deep night sky
Composition: Slightly elevated panoramic, horizontal cluster of warm building lights
Color: Deep navy-black sky, warm amber building lights, no other colors
```

### Variante C — Sala de operação minimalista
```
Subject: Empty private command center, sparse modern desk with vintage leather chair, no people
Style: Editorial architectural photography
Lighting: Single hanging Edison bulb above desk, deep ambient shadow
Composition: Centered symmetrical, low ceiling, intimate scale
Color: Black walls, warm tungsten gold light source, no other colors
```

## Critério de aprovação

A imagem está boa se:
- ✅ Não tem pessoa visível
- ✅ Centro da imagem tem tonalidade dark o suficiente pra texto branco overlay ser legível
- ✅ Tem 1-2 pontos de luz quente (não múltiplas cores)
- ✅ Não parece "stock photo de escritório"
- ✅ Transmite autoridade/operação, não casualidade

Se aprovada:
1. Salvar em `assets/hero_bg_v2.jpg`
2. Atualizar `style.css`: `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('assets/new_hero_bg.jpg');` → trocar `new_hero_bg.jpg` por `hero_bg_v2.jpg`
3. Ajustar overlay para 0.5 ou 0.55 dependendo do contraste da imagem
