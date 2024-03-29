from django.contrib.gis.geos import GEOSGeometry
from osgeo import ogr
from rest_framework import serializers
from rest_framework_gis.fields import GeometryField

from farm_base.api.v1.serializers.owner import OwnerDetailSerializer
from farm_base.models import Farm


class FarmListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farm
        fields = ['id', 'owner_id', 'name', 'centroid', 'area', 'municipality','state']
        read_only_fields = ['id', 'centroid', 'area']


class FarmCreateSerializer(serializers.ModelSerializer):
    def validate_geometry(self, data):
        if data.hasz:
            g = ogr.CreateGeometryFromWkt(data.wkt)
            g.Set3D(False)
            data = GEOSGeometry(g.ExportToWkt())
        return data

    class Meta:
        model = Farm
        fields = ['id', 'name', 'geometry', 'centroid', 'area', 'municipality', 'state']
        read_only_fields = ['id', 'centroid', 'area']


class FarmDetailSerializer(serializers.ModelSerializer):
    owner = OwnerDetailSerializer(read_only=True)

    class Meta:
        model = Farm
        fields = '__all__'
        read_only_fields = ['id', 'centroid', 'area']
