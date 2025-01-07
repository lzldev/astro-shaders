
#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_lastclick;

uniform float u_time;

float circle(in vec2 st,in vec2 center,float _radius,float t) {
    vec2 vdist = st-center;
    float dist = dot(vdist,vdist) * 4.;

    float c = _radius/2.;
    
    return 1. - smoothstep(
        c-t,
        c+t,
        dist
    );
}

float circle(in vec2 st,in vec2 center,float _radius) {
    return circle(st,center,_radius,0.005);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 nm = u_mouse / u_resolution.xy;
    vec2 nmlclick = u_lastclick / u_resolution.xy;
    
    vec3 color = vec3(st.x,st.y,1.);
    
    vec2 center = nm;

    color += vec3(5.) * circle(st,center,0.005);
    
    color += vec3(1.,1.,1.) * circle(st,nmlclick,0.005);

    gl_FragColor = vec4(color,1.);
}