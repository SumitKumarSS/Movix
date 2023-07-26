import React from "react";

import {Carousal} from "../../../components/Carousal/Carousal"
import useFetch from "../../../components/Hooks/useFetch"

const Similar = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousal
            title={title}
            data={data?.results}
            loading={loading}
            tabs={mediaType}
        />
    );
};

export default Similar;