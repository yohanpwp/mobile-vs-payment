import { View, Text, Dimensions } from "react-native";
import React from "react";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const PieChart = () => {
  // ข้อมูลที่ใช้ในการสร้าง Pie Chart
  const data = [
    { label: "Genshin Impact", value: 67, color: "#ff6f61" },
    { label: "Honkai Star Rail", value: 20, color: "#4b8b9f" },
    
  ];

  const { height, width } = Dimensions.get("window");

  const radius = width > 300 ? 100 : 60; // ขนาดรัศมีของวงกลม
  const center = radius + 20; // จุดศูนย์กลาง
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0; // เริ่มต้นจากมุม 0 องศา

  const pieSlices = data.map((item) => {
    // คำนวณมุมที่แต่ละชิ้นจะใช้
    const sliceAngle = (item.value / totalValue) * 360;

    const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
    const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);

    const x2 =
      center + radius * Math.cos((Math.PI / 180) * (startAngle + sliceAngle));
    const y2 =
      center + radius * Math.sin((Math.PI / 180) * (startAngle + sliceAngle));

    const pathData = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`;

    startAngle += sliceAngle;

    return { pathData, color: item.color };
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        เกมที่อยากเล่นในปี 2025
      </Text>
      <Svg width={center * 2} height={center * 2}>
        <G>
          {pieSlices.map((slice, index) => (
            <Path key={index} d={slice.pathData} fill={slice.color} />
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;
