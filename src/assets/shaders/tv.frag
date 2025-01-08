#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float round_to_one(float x){
   if(x > -0.1 && x < 0.1){
      return 0.;
   }else{
      return sign(x);
   }
}

float dcorner(in vec2 st,in float size){
      return 1.-step(size,dot(st,vec2(1.,1.0))) +
             1.-step(size,dot(st-1.,vec2(-1.0,-1.0))) +
     			step(1.-size,dot(st,vec2(-1.,1.))) +
     			step(1.-size,dot(st,vec2(1.,-1.)));
}

float scorner(in vec2 st,in float size){
    return (step(1.-size,st.x) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * (1.-step(size,st.y))) +
    ((step(1.-size,st.x)) * (1.-step(size,st.y)));
}

float bars(in vec2 st,in float size){
    return (step(1.-size,st.x)) +
    (step(1.-size,st.y)) +
    ((1.-step(size,st.x))) +
    ((1.-step(size,st.y)));
}

float smoothbars(in vec2 st,in float size){
   return smoothstep(size,0.0,st.y) +
          smoothstep(1.-size,1.,st.y) +
          smoothstep(1.-size,1.,st.x) +
          smoothstep(size,0.0,st.x);
}
 
void main(){
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   st.x *= u_resolution.x/u_resolution.y;
   if(u_resolution.x/u_resolution.y > 1.1 || u_resolution.x/u_resolution.y < 0.9 ){
       st.x -= 0.5;
   }
   
   st.x += round_to_one(sin(u_time*100.)) * 0.0004;

   //f6ae00
   vec3 orange = vec3(0.96,0.68,0.0);
   //c0f5fc
   vec3 blue = vec3(0.75,0.96,0.98);

   vec3 color = orange;
   float t = round_to_one(sin(u_time));
   //float t = 0.;
   
   if(t == 1.0){
      color = blue;
   }else if(t == 0.){
      color = vec3(0.0,.0,.0);
      
      float t_offset = 0.1 * mod(u_time*2.,1.);
      float bar01_offset = 0.2 + t_offset;
      float bar02_offset = 0.3 + t_offset;
      float bar_size = 0.05;

      vec3 funny_pink = vec3(0.98,0.7,0.77);
      vec3 white = vec3(1.);
      //vec3 bar_color = funny_pink;
      vec3 bar_color = vec3(0.7,0.7,0.7);

      color += bar_color * 
            (white * 
            step(bar01_offset,st.y) - 
            step(bar01_offset+bar_size,st.y));

      color += bar_color * 
            (white * 
            step(bar02_offset,st.y) - 
            step(bar02_offset+bar_size,st.y));
   }

   vec3 bar_color = vec3(0.0) - (color * smoothbars(st,0.2));

   color += bar_color * bars(st,0.1);

   gl_FragColor = vec4(color,1.0);


}