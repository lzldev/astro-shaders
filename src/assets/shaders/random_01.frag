#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float line(in float pos,in float start,in float size){
    return step(start,pos)-step(start+size,pos);
}

void main(){
    vec2 norm = gl_FragCoord.xy / u_resolution.xy;

    vec3 bg_color = vec3(0.);
    vec3 bar_color = vec3(0.,0.,0.);

    float speed = 0.5;
    float offset = -1.;
    float rows = 5.;
    float cols = 3.;

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= cols;
    st.y *= rows;

    vec2 ipos = floor(st);

    float move = (mod(ipos.y,2.0) == 0. ? u_time : u_time * offset) * speed;
    st.x += move;
    st = fract(st);

    float hash_mul = 90.;
    float hash = (floor((st.x) * hash_mul) / hash_mul);

    bg_color +=  bar_color + step(0.22,random(vec2(hash,ipos.y)));

    gl_FragColor = vec4(bg_color,1.0);
}