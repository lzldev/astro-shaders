#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;

uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 m = u_mouse / u_resolution.xy;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    gl_FragColor=vec4(abs(st.y - m.y),abs(st.x - m.x),1.0,1.);
}