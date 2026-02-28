uniform float uTime;
uniform sampler2D uTexture;
uniform float uNoiseStrength;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    vec2 p = uv - vec2(0.5);
    float d = length(p);
    uv += p * (d * d * 0.1); 

    float scanline = sin(uv.y * 800.0 + uTime * 20.0) * 0.04;
    float noise = random(uv * (uTime + 1.0));
    vec4 sandColor = vec4(vec3(noise), 1.0);

    vec4 texColor = texture2D(uTexture, uv);
    vec4 finalColor = mix(texColor, sandColor, uNoiseStrength * 0.8);

    finalColor.rgb += scanline;

    float gray = dot(finalColor.rgb, vec3(0.299, 0.587, 0.114));
    finalColor.rgb = mix(finalColor.rgb, vec3(gray), 0.3);

    float vignette = 1.0 - smoothstep(0.4, 0.6, d);
    finalColor.rgb *= mix(0.7, 1.0, vignette);

    gl_FragColor = finalColor;
}