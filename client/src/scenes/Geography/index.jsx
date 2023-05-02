import { Box,useTheme } from "@mui/material"
import { useGetGeographyQuery } from "app/api"
import Header from "components/Header"
import { ResponsiveChoropleth } from "@nivo/geo"
import {getData} from '../../app/geoData';
const Geography = () => {
    const theme = useTheme();
    const {data,isLoading} = useGetGeographyQuery();
    console.log(data);
  return (
    <div>Geography</div>
  )
}

export default Geography