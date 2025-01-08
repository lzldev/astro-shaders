#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

bool in_square(in vec2 coord,in vec2 start,in vec2 end) {
return (coord.x >= start.x && coord.x <= end.x) && (coord.y >= start.y && coord.y <= end.y);
}


bool square(in vec2 coord,in vec2 start,float size) {
return (coord.x >= start.x-size && coord.x <= start.x+size) && (coord.y >= start.y-size && coord.y <= start.y+size);
}


vec2 ssq(in vec2 coord,in vec2 start,float size) {
    return step(start-size,coord) * step(start+size,coord);
}

void main() {
    vec2 norm = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.);
    
    float pos = 0.2;

    vec2 br = step(pos,norm);
    float pct = br.x * br.y;

    vec2 tr = step(vec2(pos),1.-norm);
    float pcttr = tr.x * tr.y;

    color += vec3(pct * pcttr);
    
    
    gl_FragColor = vec4(color,1.0);
}
